/**
 * Vercel Speed Insights Integration
 * This file injects the Speed Insights tracking script for the FRATAM Junior School website
 */

(function() {
  // Initialize queue for Speed Insights
  function initQueue() {
    if (window.si) return;
    window.si = function() {
      (window.siq = window.siq || []).push(arguments);
    };
  }

  // Inject the Speed Insights script
  function injectSpeedInsights() {
    // Don't inject if already present
    if (window.si) return;
    
    initQueue();
    
    // Create and configure the script
    const script = document.createElement('script');
    script.src = '/_vercel/speed-insights/script.js';
    script.defer = true;
    script.dataset.sdkn = '@vercel/speed-insights';
    script.dataset.sdkv = '1.3.1';
    
    // Handle script load errors
    script.onerror = function() {
      console.log('[Vercel Speed Insights] Failed to load script. Please check if any content blockers are enabled.');
    };
    
    // Inject into document head
    document.head.appendChild(script);
  }

  // Inject when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSpeedInsights);
  } else {
    injectSpeedInsights();
  }
})();
