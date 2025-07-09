import { NextRequest, NextResponse } from 'next/server'; 
import { useRouter } from 'next/router';
import { fetchRedirectEntry } from './lib/contentstack-redirects'; 
const ignoreRouteList = ['/favicon.ico', '/robots.txt','/manifest.json']; // Add more if needed


 

export async function middleware(request: NextRequest) { 
    const { pathname, search, locale } = request.nextUrl;
    let path = pathname;
    let url = pathname + search; 

    if (ignoreRouteList.some((route) => url.endsWith(route))) {
        return NextResponse.next();
    }

    const path2 = path.endsWith('/') ? path.slice(0, -1) : path + '/';
    if (search.includes('gh_id=')) {
            path = url;
    }
    const middlewarereredirectresponse= await fetchRedirectEntry(path,request.nextUrl.locale || 'en-us'); 
    const data = middlewarereredirectresponse;
    
    if (data && data.title != undefined) {
      const entry = data;
      const status = entry.status_code ? 302 : 301; 
      return NextResponse.redirect(new URL(`${entry.to_url}`, request.url), status);
    }
    return NextResponse.next();
}

 
export const config = {
  matcher: ['/:path*'], 
  runtime: 'nodejs',  
};
