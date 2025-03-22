# Supabase

## Update user credentials

```js
const { createClient } = require("@supabase/supabase-js");
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
);
supabaseAdmin.auth.admin.updateUserById(
  "00000000-0000-0000-0000-000000000001",
  { "password": "password" },
).then(console.log);
```
