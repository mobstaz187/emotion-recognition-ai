const scriptCache = new Set<string>();

export async function loadScript(cdnUrl: string): Promise<void> {
  const scriptUrl = `${cdnUrl}/bundle.js`;
  
  if (scriptCache.has(scriptUrl)) return;
  
  try {
    // Remove existing scripts
    document.querySelectorAll('script[src*="pickaxeproject"]')
      .forEach(script => script.remove());

    // Add new script
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.defer = true;
    
    await new Promise<void>((resolve, reject) => {
      script.onload = () => {
        scriptCache.add(scriptUrl);
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  } catch (error) {
    console.error('Failed to load Pickaxe script:', error);
    throw error;
  }
}