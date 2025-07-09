
import { RedirectProps } from "../model/Redirect";
export async function fetchRedirectEntry(path: string,locale: string): Promise<RedirectProps| null> { 

    //console.log(`Fetching redirect entry for path: ${path} and locale: ${locale}`);
    const environment = process.env.CONTENTSTACK_ENVIRONMENT;
    const apiKey = process.env.CONTENTSTACK_API_KEY;
    const accessToken = process.env.CONTENTSTACK_DELIVERY_TOKEN;
    const host = process.env.CONTENTSTACK_APP_HOST;

    //console.log(`Environment: ${environment}, API Key: ${apiKey}, Access Token: ${accessToken}, Host: ${host}`);    

    const redirectApi = `https://${host}/v3/content_types/_redirect/entries?environment=${environment}&locale=${locale}&include_count=true&query={"from_url":"${path}"}`;  


     
     
    const response = await fetch(redirectApi, {
      headers: {
        api_key: apiKey!,
        access_token: accessToken!,
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  
    if (!response.ok) {
      console.error(`Redirect check failed: ${response.statusText}`);
      return null;
    }
  
    const data = await response.json();
    return data.entries && data.entries.length > 0 ? data.entries[0] : null;
  } 