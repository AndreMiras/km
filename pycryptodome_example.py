"""
Simply testing PyCryptodome AES module.
Produces the following output:
```
Crypto.version_info: (3, 8, '2')
data: b'Hello PyCryptodome!'
encrypted:
[b'\x9dS\x19\xed5\xbc\xf0d}iq \xc1\xcc\xecg',
 b'\x83\xb3)$\x8f;R#\x9a\xfd\x8cK7>j\xed',
 b'\x89\xa6\xa1\xfab\xe4\x95U\xcd\x0c,\xcc\x87\xb9\xb9/\x94k\xba']
decrypted: b'Hello PyCryptodome!'
```
"""
from pprint import pprint
from typing import List

import Crypto
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes


def encrypt(key: bytes, data: bytes) -> List[bytes]:
    """
    Given a key and data returns a list containing nonce, tag and ciphertext.
    """
    cipher = AES.new(key, AES.MODE_EAX)
    ciphertext, tag = cipher.encrypt_and_digest(data)
    encrypted = [x for x in (cipher.nonce, tag, ciphertext)]
    return encrypted


def decrypt(key: bytes, data: bytes) -> bytes:
    """
    Given a key and data (nonce, tag and ciphertext), returns decrypted data.
    """
    nonce, tag, ciphertext = data
    cipher = AES.new(key, AES.MODE_EAX, nonce)
    decrypted = cipher.decrypt_and_verify(ciphertext, tag)
    return decrypted


def main():
    print(f'Crypto.version_info: {Crypto.version_info}')
    key = get_random_bytes(16)
    data = b'Hello PyCryptodome!'
    print(f'data: {data}')
    encrypted = encrypt(key, data)
    print('encrypted:')
    pprint(encrypted)
    decrypted = decrypt(key, encrypted)
    print(f'decrypted: {decrypted}')
    assert data == decrypted


if __name__ == '__main__':
    main()
