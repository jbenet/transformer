
# transformer todo

## types

(quick brainstorm)

- ip addresses
  - ip-address-type
  - ipv4-address-type
  - ipv6-address-type
  - hex-ip-address-codec
  - string-ip-address-codec (hbo)
  - bytes-ip-address-codec (nbo)

- phone numbers
  - international-phone-number-type
  - us-phone-number-type
    - parens-us-phone-number-codec
    - dotted-us-phone-number-codec
    - dashed-us-phone-number-codec

- date-type
  - unix-time-date-codec
  - iso-date-codec

- time-type
  - unix-time-codec
  - iso-time-codec (hrs:min:sec.subsec)
  - 24hr-day-time-codec
  - 12hr-day-time-codec (hrs:min am/pm)


- number-type
  - int-codec
  - float-codec
  - base-n-codec
  - big-endian-codec
  - little-endian-codec
  - network-byte-order-codec
  - absolute-value-codec

- buffers
  - hex-codec
  - base64-codec
  - base32-codec
  - base56-codec
  - base-n-codec

- escaping characters
  - html

- image-type
  - png-codec
  - jpg-codec
  - gif-codec

- file-type

- directory-type

- compression codecs
  - zip-codec
  - bzip2-codec
  - zippy-codec
  - tar-codec
  - rar-codec

- formats
  - json-codec
  - jsonml-xml-codec

- strings
  - capitalize-string-codec
  - split-string-codec
  - lowercase-string-codec
  - uppercase-string-codec

- isbn to book title (conversion)
