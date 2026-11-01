## TCP/IP Model (4 Layers)

- **Application Layer**
  - Provides services to the user (web, email, file transfer).
  - Protocols: HTTP, FTP, SMTP, DNS, DHCP.
- **Transport Layer**
  - Ensures end-to-end communication.
  - Handles segmentation, error control, flow control.
  - Protocols: TCP (reliable, ordered), UDP (fast, connectionless).
- **Internet Layer**
  - Handles logical addressing and routing of packets.
  - Ensures data can travel across networks.
  - Protocols: IP (IPv4/IPv6), ICMP, ARP, RARP, IGMP
- **Network Access Layer (Link Layer)**
  - Deals with physical transmission over the medium.
  - Handles framing, MAC addressing, error detection.
  - Examples: Ethernet, Wi-Fi, PPP.

## OSI Model (7 Layers)

- **Application Layer** → Provides user services (HTTP, FTP, SMTP).
- **Presentation Layer** → Data translation, encryption, compression.
- **Session Layer** → Manages sessions (start, maintain, terminate).
- **Transport Layer** → Reliable end-to-end delivery (TCP/UDP).
- **Network Layer** → Logical addressing and routing (IP).
- **Data Link Layer** → Framing, MAC addressing, error detection (Ethernet, Wi-Fi).
- **Physical Layer** → Transmission of raw bits over physical medium (cables, radio waves).

::viz network-layers

## TCP vs UDP

- Use TCP when correctness and reliability matter. Use UDP (protocol inside the Transport Layer of the TCP/IP model) when speed and low latency matter, and occasional data loss is acceptable

::viz tcp-udp
- **TCP 3-way handshake:** SYN → SYN-ACK → ACK

## HTTP and the Web

- **What happens when you type a URL?** DNS lookup (browser cache → OS → resolver) → TCP 3-way handshake → TLS handshake (for HTTPS) → HTTP request → server response → browser parses HTML, fetches CSS/JS/images and renders
- **HTTP status codes:** 2xx success (200 OK, 201 Created), 3xx redirect (301 permanent, 302/307 temporary), 4xx client error (400, 401 unauthenticated, 403 forbidden, 404, 429 rate limited), 5xx server error (500, 502 bad gateway, 503 unavailable)
- **HTTP methods:** GET (read, safe), POST (create), PUT (replace, idempotent), PATCH (partial update), DELETE (idempotent)
- **REST:** stateless, resource-based URLs, standard HTTP methods
