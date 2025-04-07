import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private key: CryptoKey | null = null;
  private ivLength = 16; // 16 bytes = 128 bits para AES IV

  constructor() {
    // ¡¡¡ATENCIÓN: La gestión segura de esta clave es CRÍTICA y NO debe hardcodearse así!!!
    // Esto es solo un ejemplo conceptual. La clave debería obtenerse de forma segura.
    const secretKey = 'SW50M3JyNHAxZDFzMW0wQ2w0UzMzbmNyMXBjMTBuUHQ='; // Debe ser compartida con el backend
    const secretKeyString = atob(secretKey);
    const keyBytes = new TextEncoder().encode(secretKeyString);
    this.importKey(keyBytes);
  }

  private async importKey(keyBytes: Uint8Array): Promise<void> {
    try {
      this.key = await crypto.subtle.importKey(
        "raw",
        keyBytes,
        { name: "AES-CBC" }, // O AES-GCM si lo usas
        true, // extractable = false en producción si es posible
        ["encrypt", "decrypt"]
      );
      console.log("Clave AES importada correctamente.");
    } catch (error) {
      console.error("Error importando la clave AES:", error);
      throw new Error("No se pudo inicializar el servicio de cifrado.");
    }
  }
  
  async encryptData(plainText: string): Promise<string> {
    if (!this.key) {
      throw new Error("La clave de cifrado no está inicializada.");
    }

    const iv = crypto.getRandomValues(new Uint8Array(this.ivLength)); // IV aleatorio
    const encodedText = new TextEncoder().encode(plainText);

    try {
      const ciphertextBuffer = await crypto.subtle.encrypt(
        {
          name: "AES-CBC", // Debe coincidir con .NET (CBC con PKCS7 padding es el default aquí)
          iv: iv
        },
        this.key,
        encodedText
      );

      // Concatenar IV + Ciphertext
      const resultBuffer = new Uint8Array(iv.length + ciphertextBuffer.byteLength);
      resultBuffer.set(iv, 0);
      resultBuffer.set(new Uint8Array(ciphertextBuffer), iv.length);

      // Convertir a Base64 para enviar
      return this.arrayBufferToBase64(resultBuffer.buffer);

    } catch (error) {
      console.error("Error al cifrar:", error);
      throw new Error("Fallo en el cifrado.");
    }
  }

  async decryptData(cipherTextBase64: string): Promise<string>  {
     if (!this.key) {
       throw new Error("La clave de cifrado no está inicializada.");
     }

    try {
        const fullCipherBytes = this.base64ToArrayBuffer(cipherTextBase64);

        if (fullCipherBytes.byteLength < this.ivLength) {
             throw new Error("Texto cifrado inválido o incompleto.");
        }

        // Extraer IV y texto cifrado
        const iv = fullCipherBytes.slice(0, this.ivLength);
        const ciphertext = fullCipherBytes.slice(this.ivLength);


        const decryptedBuffer = await crypto.subtle.decrypt(
        {
          name: "AES-CBC", // Debe coincidir con .NET
          iv: iv
        },
        this.key,
        ciphertext
      );

      return new TextDecoder().decode(decryptedBuffer);

    } catch (error) {
      console.error("Error al descifrar:", error);
      // Podría ser por clave incorrecta, IV incorrecto, padding inválido, o texto corrupto
      throw new Error("Fallo en el descifrado.");
    }
  }


  // --- Funciones auxiliares Base64 ---
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

 private base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binary_string = atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
 }

}
