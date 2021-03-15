/**
 * @name  de4js
 * @description  JavaScript Deobfuscator and Unpacker
 * @author  Zzbaivong <Zzbaivong@gmail.com> (https://lelinhtinh.github.io)
 * @version  1.11.1
 * @copyright  Zzbaivong 2017
 * @license  MIT
 */

/* globals EvalDecode, ArrayDecode, _NumberDecode, JSFuckDecode, ObfuscatorIO, CleanSource, AADecode, JJdecode, Urlencoded, P_A_C_K_E_R, JavascriptObfuscator, MyObfuscate */
/* eslint-disable no-console */

self.addEventListener('message', (e) => {
  self.importScripts('math.min.js');
  self.importScripts('utils.js');

  let source = e.data.source;
  const packer = e.data.packer;
  const options = e.data.options;

  const methods = {
    evalencode: () => {
      self.importScripts('evaldecode.js');
      return EvalDecode(source);
    },
    _numberencode: () => {
      self.importScripts('numberdecode.js');
      return _NumberDecode(source);
    },
    arrayencode: () => {
      self.importScripts('arraydecode.js');
      return ArrayDecode(source, options);
    },
    jsfuck: () => {
      self.importScripts('jsfuckdecode.js');
      return JSFuckDecode(source);
    },
    obfuscatorio: () => {
      self.importScripts('obfuscatorio.js');
      return ObfuscatorIO(source, options);
    },
    cleansource: () => {
      self.importScripts('cleansource.js');
      return CleanSource(source, options);
    },
    aaencode: () => {
      self.importScripts('aadecode.js');
      return AADecode.decode(source);
    },
    jjencode: () => {
      self.importScripts('jjdecode.js');
      return JJdecode.decode(source);
    },
    urlencode: () => {
      self.importScripts('urlencode_unpacker.js');
      if (Urlencoded.detect(source)) return Urlencoded.unpack(source);
      throw 'Not matched';
    },
    p_a_c_k_e_r: () => {
      self.importScripts('p_a_c_k_e_r_unpacker.js');
      if (P_A_C_K_E_R.detect(source)) return P_A_C_K_E_R.unpack(source);
      throw 'Not matched';
    },
    javascriptobfuscator: () => {
      self.importScripts('javascriptobfuscator_unpacker.js');
      if (JavascriptObfuscator.detect(source)) return JavascriptObfuscator.unpack(source);
      throw 'Not matched';
    },
    myobfuscate: () => {
      self.importScripts('myobfuscate_unpacker.js');
      if (MyObfuscate.detect(source)) return MyObfuscate.unpack(source);
      throw 'Not matched';
    },
  };

  try {
    source = methods[packer]();
  } catch (err) {
    throw new Error(err);
  }

  self.postMessage(source);
});