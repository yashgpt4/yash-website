export function generatePreview(content: string, maxChars: number = 60): string {
  // Remove markdown syntax and get first line with content
  const lines = content.split('\n');

  for (const line of lines) {
    const cleaned = line
      .replace(/^#+\s+/, '') // Remove heading markers
      .replace(/[*_`\[\]()]/g, '') // Remove markdown symbols
      .trim();

    if (cleaned) {
      return cleaned.length > maxChars
        ? cleaned.substring(0, maxChars) + '…'
        : cleaned;
    }
  }

  return 'No content';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

export function getTagAccentColor(tag: string): string {
  const colors: Record<string, string> = {
    pinned: '#DC2626',
    now: '#2563EB',
    work: '#16A34A',
    writing: '#D97706',
    principles: '#9333EA',
    reading: '#0D9488',
  };
  return colors[tag] || '#78716C';
}

export function getTagBgColor(tag: string): string {
  const colors: Record<string, string> = {
    pinned: '#FEF2F2',
    now: '#EFF6FF',
    work: '#F0FDF4',
    writing: '#FFFBEB',
    principles: '#FAF5FF',
    reading: '#F0FDFA',
  };
  return colors[tag] || '#F5F5F4';
}
