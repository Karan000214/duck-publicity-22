// Cookie Tracker Utility for Duck Publicity

export const setCookie = (name, value, days = 365) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/; SameSite=Lax`;
};

export const getCookie = (name) => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
  }
  return null;
};

export const initCookieTracker = () => {
  try {
    const now = new Date().toISOString();
    let visitorId = getCookie('duck_visitor_id');
    let visitCount = parseInt(getCookie('duck_visit_count') || '0', 10);
    let isReturning = false;

    // 1. Visitor ID Cookie
    if (!visitorId) {
      visitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      setCookie('duck_visitor_id', visitorId, 365);
      setCookie('duck_first_visit', now, 365);
      visitCount = 1;
    } else {
      isReturning = true;
      visitCount += 1;
    }

    setCookie('duck_visit_count', visitCount.toString(), 365);
    setCookie('duck_last_visit', now, 365);

    // 2. Parse UTM / Marketing Campaign Parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || getCookie('duck_utm_source') || 'Direct / Organic';
    const utmMedium = urlParams.get('utm_medium') || getCookie('duck_utm_medium') || 'None';
    const utmCampaign = urlParams.get('utm_campaign') || getCookie('duck_utm_campaign') || 'None';

    if (urlParams.get('utm_source')) setCookie('duck_utm_source', utmSource, 30);
    if (urlParams.get('utm_medium')) setCookie('duck_utm_medium', utmMedium, 30);
    if (urlParams.get('utm_campaign')) setCookie('duck_utm_campaign', utmCampaign, 30);

    return {
      visitorId,
      visitCount,
      isReturning,
      firstVisit: getCookie('duck_first_visit') || now,
      lastVisit: now,
      utmSource,
      utmMedium,
      utmCampaign,
    };
  } catch (err) {
    console.error('Cookie tracking initialization error:', err);
    return {
      visitorId: 'v_fallback',
      visitCount: 1,
      isReturning: false,
      utmSource: 'Direct',
    };
  }
};
