/**
 * Helper to share a doodle image and message using the Web Share API.
 * Pulls the dataUrl from a canvas and triggers the native OS sharing sheet.
 */

/**
 * Transforms the transparent doodle into a beautiful social media poster.
 */
export const createPoster = async (originalDataUrl: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) return resolve(originalDataUrl);

      // Draw playful gradient background (matches the app's bg-playful gradient concept)
      const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
      gradient.addColorStop(0, '#EDE4FC'); // pastel-lavender-like
      gradient.addColorStop(0.5, '#FCE4D6'); // pastel-peach-like
      gradient.addColorStop(1, '#D6F2E5'); // pastel-mint-like
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1080, 1080);

      // Draw inner white card with shadow
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 10;
      ctx.fillStyle = '#ffffff';
      
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(60, 60, 960, 960, 48);
        ctx.fill();
      } else {
        ctx.fillRect(60, 60, 960, 960);
      }

      // Reset shadow for further drawing
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // Draw the doodle image, fit inside 800x800 bounding box
      const maxSize = 800;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      const x = (1080 - w) / 2;
      const y = (1080 - h) / 2;

      ctx.drawImage(img, x, y, w, h);

      // Add branding text
      ctx.fillStyle = '#2d234a'; // dark purple foreground
      ctx.font = 'bold 36px "Nunito", sans-serif';
      ctx.textAlign = 'center';
      
      // Top header
      ctx.fillText('⚡ Doodle Burst', 540, 140);

      // Bottom footer branding
      ctx.font = 'bold 28px "Nunito", sans-serif';
      ctx.fillStyle = '#6b5f85'; // muted foreground
      ctx.fillText('Try the TherapyMantra app today!', 540, 960);

      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = () => resolve(originalDataUrl); // Fallback to raw doodle if fails
    img.src = originalDataUrl;
  });
};

export async function shareDoodle(dataUrl: string, shareText: string) {
  try {
    // 1. Create a beautiful poster instead of just sharing the transparent doodle
    const posterDataUrl = await createPoster(dataUrl);

    // 2. Convert dataUrl to Blob
    const response = await fetch(posterDataUrl);
    const blob = await response.blob();
    const file = new File([blob], "therapy-mantra-doodle.png", { type: "image/png" });

    // 3. Check if we can share the file
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Doodle Burst by TherapyMantra",
        text: shareText,
      });
    } else {
      // 4. Fallback: Copy text and download image
      await navigator.clipboard.writeText(shareText);
      const link = document.createElement("a");
      link.href = posterDataUrl;
      link.download = "therapy-mantra-doodle.png";
      link.click();
      alert("Sharing not supported directly on this browser. The poster was downloaded and text copied to your clipboard!");
    }
  } catch (error) {
    console.error("Error sharing doodle:", error);
    // Generic fallback for any unexpected errors
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "therapy-mantra-doodle.png";
    link.click();
  }
}
