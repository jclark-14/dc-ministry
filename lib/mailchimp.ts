import mailchimp from '@mailchimp/mailchimp_marketing';

// Check for environment variables
if (
  !process.env.MAILCHIMP_API_KEY ||
  !process.env.MAILCHIMP_SERVER_PREFIX ||
  !process.env.MAILCHIMP_LIST_ID
) {
  throw new Error('Missing required Mailchimp environment variables');
}

// Store them in variables after checking
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY as string;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX as string;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID as string;

mailchimp.setConfig({
  apiKey: MAILCHIMP_API_KEY,
  server: MAILCHIMP_SERVER_PREFIX,
});

export async function subscribeUser(email: string) {
  try {
    const response = await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
    });
    return response;
  } catch (error) {
    throw new Error(
      `Subscription failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
