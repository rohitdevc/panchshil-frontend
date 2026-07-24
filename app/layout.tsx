import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import {
  zapfHumanist601Roman,
  zapfHumanist601Bold,
  zapfHumanist601Semi,
  zapfHumanist601Ultra,
} from "./fonts";
import { AuthProvider } from "@/contexts/AuthProvider";
import { NavigationMenuProvider } from "@/components/NavigationMenuProvider";
import { getNavigationMenu, getContactDetails } from "@/api/CMS.api";
import { NavigationMenuProps, ContactDetailsProps } from "@/interfaces";

// Open Sans as default font
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Panchshil - India's Leading Luxury Developer",
  description:
    "Since 2002, Panchshil Realty has set benchmarks in design, delivery and urban placemaking. From landmark residences and global office districts to iconic hospitality and convention destinations.",
  icons: {
    apple: "/assets/images/apple-touch-icon.png",
    icon: [
      {
        url: "/assets/images/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/assets/images/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
  },
  manifest: "/assets/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialToken: string | null = null;
  const initialError: string | null = null;
  let initialNavigationMenu: NavigationMenuProps[] = [];
  let initialContactDetails: ContactDetailsProps = [];

  try {
    const [menuResponse, contactDetailsResponse] = await Promise.allSettled([
      getNavigationMenu(),
      getContactDetails(),
    ]);

    if (
      menuResponse.status === "fulfilled" &&
      menuResponse.value &&
      Array.isArray(menuResponse.value)
    ) {
      initialNavigationMenu = menuResponse.value as NavigationMenuProps[];
    }

    if (
      contactDetailsResponse.status === "fulfilled" &&
      contactDetailsResponse.value &&
      Array.isArray(contactDetailsResponse.value)
    ) {
      initialContactDetails =
        contactDetailsResponse.value as ContactDetailsProps;
    }
  } catch (menuError) {
    console.error(
      "Error fetching navigation menu or contact details in layout:",
      menuError
    );
  }

  const structuredData = [
    {
      "@context": "http://schema.org",
      "@type": "LocalBusiness",
      name: "Panchshil Realty",
      image: "https://www.panchshil.com/assets/images/home/logo.png",
      telephone: "+912066473200",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Tech Park One, Tower E, 191",
        addressLocality: "Yerwada",
        addressCountry: "INDIA",
        postalCode: "411 006",
      },
      url: "https://www.panchshil.com/",
    },
    {
      "@context": "http://schema.org",
      "@type": "LocalBusiness",
      name: "Panchshil",
      image: "https://www.panchshil.com/assets/images/home/logo.png",
      telephone: "+912066473200",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Tech Park One, Tower E, 191",
        addressLocality: "Pune",
        addressCountry: "INDIA",
        postalCode: "411 006",
      },
      url: "https://www.panchshil.com/",
    },
  ];

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-102870459-1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-1" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-102870459-1');
          `}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-778184038"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-2" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-778184038');
          `}
        </Script>
        <Script id="google-conversion" strategy="afterInteractive">
          {`
            gtag('event', 'conversion', {'send_to': 'AW-778184038/o_MwCIXvypMBEObKiPMC'});
          `}
        </Script>
        <Script id="jquery-fallback" strategy="beforeInteractive">
          {`
            // Prevent jQuery errors if GTM tags require it
            (function() {
              if (typeof window.jQuery === 'undefined' && typeof window.$ === 'undefined') {
                var createNoop = function() {
                  var noop = function() { return noop; };
                  noop.ready = function(fn) { 
                    if (document.readyState === 'complete') { 
                      setTimeout(fn, 0); 
                    } else { 
                      document.addEventListener('DOMContentLoaded', fn); 
                    }
                    return noop;
                  };
                  noop.on = noop.off = noop.click = noop.each = noop.find = 
                  noop.addClass = noop.removeClass = noop.hide = noop.show = 
                  noop.fadeIn = noop.fadeOut = noop.slideDown = noop.slideUp = 
                  noop.val = noop.text = noop.html = noop.attr = noop.data = 
                  noop.append = noop.prepend = noop.remove = noop.empty = noop;
                  noop.is = function() { return false; };
                  noop.length = 0;
                  return noop;
                };
                var noop = createNoop();
                window.jQuery = window.$ = function(selector) {
                  if (typeof selector === 'function') {
                    noop.ready(selector);
                    return noop;
                  }
                  return noop;
                };
                window.jQuery.fn = window.$.fn = {};
                window.jQuery.ajax = function() { return Promise.resolve({}); };
                window.jQuery.when = function() { return Promise.resolve({}); };
              }
            })();
          `}
        </Script>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KSDBCQ8');
          `}
        </Script>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '474815303023180'); 
            fbq('track', 'PageView');
          `}
        </Script>
        <Script
          id="verloop-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w, d, s, u) {
            w.Verloop = function(c) { w.Verloop._.push(c); };
            w.Verloop._ = [];
            w.Verloop.url = u;
            var h = d.getElementsByTagName(s)[0],
                j = d.createElement(s);
            j.async = true;
            j.src = 'https://panchshil.verloop.io/livechat/script.min.js';
            h.parentNode.insertBefore(j, h);
          })(window, document, 'script', 'https://panchshil.verloop.io/livechat');

          Verloop(function() {
            this.setRecipe("HsC2v2HFdzCoiKdrj");
          });
        `,
          }}
        />
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body
        className={`${openSans.variable} ${zapfHumanist601Roman.variable} ${zapfHumanist601Bold.variable} ${zapfHumanist601Semi.variable} ${zapfHumanist601Ultra.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider initialToken={initialToken} initialError={initialError}>
          <NavigationMenuProvider
            initialNavigationMenu={initialNavigationMenu}
            initialContactDetails={initialContactDetails}
          >
            {children}
          </NavigationMenuProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
