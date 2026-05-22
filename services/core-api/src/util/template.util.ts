

const replaceTableBlock = (template: string, records: Record<string, any>[], prefix: string): string => {
  const blockRegex = /\[_(.+?)_\]/s;
  const match = template.match(blockRegex);
  
  if (!match) return template;

  const blockContent = match[1];

  // Monta regex com o prefixo: {:COLUMN_PHONE_(\w+)}
  const columnTagRegex = new RegExp(`\\{:COLUMN_${prefix}_(\\w+)\\}`, 'g');
  const columns: { tag: string; key: string }[] = [];

  let tagMatch;
  while ((tagMatch = columnTagRegex.exec(blockContent)) !== null) {
    columns.push({
      tag: tagMatch[0],               // {:COLUMN_PHONE_TYPE}
      key: tagMatch[1].toLowerCase()  // type → record.type
    });
  }

  const rows = records.map(record => {
    const tds = columns
      .map(col => `<td>${record[col.key] ?? ''}</td>`)
      .join('');
    return `<tr>${tds}</tr>`;
  }).join('\n');

  return template.replace(blockRegex, rows);
}

export = {
    replaceTableBlock
}