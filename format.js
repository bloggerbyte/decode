/**
 * @name  de4js
 * @description  JavaScript Deobfuscator and Unpacker
 * @author  Zzbaivong <Zzbaivong@gmail.com> (https://lelinhtinh.github.io)
 * @version  1.11.1
 * @copyright  Zzbaivong 2017
 * @license  MIT
 */

self.addEventListener('message', (e) => {
  let source = e.data.source;
  const options = e.data.options;

  if (!options.formatCode) {
    self.postMessage({
      result: source,
      highlight: true,
    });
    return;
  }

  try {
    self._window = self.window;
    self.window = {};

    self.importScripts('beautify.min.js');

    source = self.window.js_beautify(source, {
      unescape_strings: true,
      jslint_happy: true,
    });

    self.window = self._window;
  } catch (err) {
    console.error(err);
  }

  self.postMessage({
    result: source,
    highlight: false,
  });

  try {
    self.importScripts('highlight.min.js');

    source = self.hljs.highlight('javascript', source).value;

    if (options.lineNumbers) {
      source = source.split('\n');
      source = source.join('</code><code>');
      source = `<code>${source}</code>`;
    }
  } catch (err) {
    throw new Error(err);
  }

  self.postMessage({
    result: source,
    highlight: true,
  });
});