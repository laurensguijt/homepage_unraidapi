---
title: Unraid
description: Unraid Widget Configuration
---

Learn more about [Unraid](https://unraid.net/).

This widget displays CPU load, memory usage and overall disk utilisation by querying the Unraid API.

Allowed fields: ["cpu", "memory", "disk"].

```yaml
widget:
  type: unraid
  url: http://unraid.host.or.ip
  key: your_api_key
```
