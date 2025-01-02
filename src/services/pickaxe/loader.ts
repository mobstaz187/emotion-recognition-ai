export async function loadPickaxeScript(scriptUrl: string): Promise<void> {
  if (document.querySelector(`script[src="${scriptUrl}"]`)) {
    return;
  }

  const script = document.createElement('script');
  script.src = scriptUrl;
  script.defer = true;
  document.head.appendChild(script);
}

export function cleanupPickaxeScripts(): void {
  document.querySelectorAll('script[src*="pickaxeproject"]')
    .forEach(script => script.remove());
}