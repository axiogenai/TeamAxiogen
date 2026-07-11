import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 1. Try to save to Supabase contact_submissions table (non-blocking — fails silently if offline)
    if (supabase) {
      try {
        await supabase
          .from('contact_submissions')
          .insert([{ name, email, message }]);
      } catch (sbErr) {
        console.warn('Supabase contact insert failed (offline?) — continuing:', sbErr);
      }
    }

    // 2. Try to send email via Web3Forms in the background
    const web3Key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (web3Key) {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          name,
          email,
          message,
          subject: `Axiogen Portfolio Contact: ${name}`,
        }),
      });
    }

    // 3. Try to send to WhatsApp DM using Meta WhatsApp Cloud API (Your own bot)
    const metaAccessToken = process.env.META_WA_ACCESS_TOKEN;
    const metaPhoneId = process.env.META_WA_PHONE_NUMBER_ID;
    const metaTo = process.env.META_WA_TO_NUMBER;

    if (metaAccessToken && metaPhoneId && metaTo) {
      const waText = `*New Axiogen Submission*\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
      await fetch(`https://graph.facebook.com/v20.0/${metaPhoneId}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${metaAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: metaTo,
          type: 'text',
          text: {
            preview_url: false,
            body: waText,
          },
        }),
      });
    }

    // 4. Try to send to WhatsApp DM using CallMeBot API (free & simple background gateway fallback)
    const waPhone = process.env.WHATSAPP_RECEIVER_PHONE;
    const waApikey = process.env.WHATSAPP_CALLMEBOT_APIKEY;
    if (waPhone && waApikey && !(metaAccessToken && metaPhoneId)) {
      const waText = `*New Axiogen Submission*\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
      const url = `https://api.callmebot.com/whatsapp.php?phone=${waPhone}&text=${encodeURIComponent(waText)}&apikey=${waApikey}`;
      await fetch(url);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
