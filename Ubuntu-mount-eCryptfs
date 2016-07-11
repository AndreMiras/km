# Mounting eCryptfs on Ubuntu

    sudo ecryptfs-unwrap-passphrase /media/<disk>/home/.ecryptfs/<user>/.ecryptfs/wrapped-passphrase
    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

    ecryptfs-add-passphrase --fnek
    Passphrase: aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    Inserted auth tok with sig [bbbbbbbbbbbbbbbb] into the user session keyring
    Inserted auth tok with sig [cccccccccccccccc] into the user session keyring

    sudo mount -t ecryptfs /media/<disk>/home/.ecryptfs/<user>/.Private/ /mnt/
    Passphrase:
    Select cipher:
     1) aes: blocksize = 16; min keysize = 16; max keysize = 32
     2) blowfish: blocksize = 8; min keysize = 16; max keysize = 56
     3) des3_ede: blocksize = 8; min keysize = 24; max keysize = 24
     4) twofish: blocksize = 16; min keysize = 16; max keysize = 32
     5) cast6: blocksize = 16; min keysize = 16; max keysize = 32
     6) cast5: blocksize = 8; min keysize = 5; max keysize = 16
    Selection [aes]: aes
    Select key bytes:
     1) 16
     2) 32
     3) 24
    Selection [16]: 1
    Enable plaintext passthrough (y/n) [n]: n
    Enable filename encryption (y/n) [n]: y
    Filename Encryption Key (FNEK) Signature: cccccccccccccccc
    Attempting to mount with the following options:
      ecryptfs_unlink_sigs
      ecryptfs_fnek_sig=cccccccccccccccc
      ecryptfs_key_bytes=16
      ecryptfs_cipher=aes
      ecryptfs_sig=bbbbbbbbbbbbbbbb
    Mounted eCryptfs
