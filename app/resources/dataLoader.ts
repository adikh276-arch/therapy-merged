export async function getLocalizedData(langCode: string) {
  const lang = langCode.split('-')[0];
  const fullLang = langCode === 'zh-CN' ? 'zh-Hans' : 
                   langCode === 'zh-TW' ? 'zh-Hant' : langCode;
  
  const targetLangs = Array.from(new Set([fullLang, lang, 'en']));
  
  for (const l of targetLangs) {
    try {
      switch (l) {
        case 'ar': return (await import('./data/sample_data_ar.json')).default;
        case 'bn': return (await import('./data/sample_data_bn.json')).default;
        case 'cs': return (await import('./data/sample_data_cs.json')).default;
        case 'da': return (await import('./data/sample_data_da.json')).default;
        case 'de': return (await import('./data/sample_data_de.json')).default;
        case 'el': return (await import('./data/sample_data_el.json')).default;
        case 'es': return (await import('./data/sample_data_es.json')).default;
        case 'fi': return (await import('./data/sample_data_fi.json')).default;
        case 'fr': return (await import('./data/sample_data_fr.json')).default;
        case 'he': return (await import('./data/sample_data_he.json')).default;
        case 'hi': return (await import('./data/sample_data_hi.json')).default;
        case 'hu': return (await import('./data/sample_data_hu.json')).default;
        case 'id': return (await import('./data/sample_data_id.json')).default;
        case 'it': return (await import('./data/sample_data_it.json')).default;
        case 'ja': return (await import('./data/sample_data_ja.json')).default;
        case 'ko': return (await import('./data/sample_data_ko.json')).default;
        case 'ms': return (await import('./data/sample_data_ms.json')).default;
        case 'nl': return (await import('./data/sample_data_nl.json')).default;
        case 'no': return (await import('./data/sample_data_no.json')).default;
        case 'pl': return (await import('./data/sample_data_pl.json')).default;
        case 'pt': return (await import('./data/sample_data_pt.json')).default;
        case 'ro': return (await import('./data/sample_data_ro.json')).default;
        case 'ru': return (await import('./data/sample_data_ru.json')).default;
        case 'sv': return (await import('./data/sample_data_sv.json')).default;
        case 'ta': return (await import('./data/sample_data_ta.json')).default;
        case 'te': return (await import('./data/sample_data_te.json')).default;
        case 'th': return (await import('./data/sample_data_th.json')).default;
        case 'tl': return (await import('./data/sample_data_tl.json')).default;
        case 'tr': return (await import('./data/sample_data_tr.json')).default;
        case 'uk': return (await import('./data/sample_data_uk.json')).default;
        case 'ur': return (await import('./data/sample_data_ur.json')).default;
        case 'vi': return (await import('./data/sample_data_vi.json')).default;
        case 'zh-Hans': return (await import('./data/sample_data_zh-Hans.json')).default;
        case 'zh-Hant': return (await import('./data/sample_data_zh-Hant.json')).default;
        case 'en':
        default:
          return (await import('./data/sample_data.json')).default;
      }
    } catch (e) {
      console.warn(`Could not import data for language ${l}, checking next fallback...`);
    }
  }
  
  return (await import('./data/sample_data.json')).default;
}
