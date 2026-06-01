export const handlePlatformExit = () => {
  if (typeof window === 'undefined') return;
  if (window.parent !== window) {
    window.parent.postMessage({ action: 'exit' }, 'https://web.mantracare.com');
  } else {
    window.location.href = 'https://web.mantracare.com';
  }
};
