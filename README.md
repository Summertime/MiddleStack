# MiddleStack

The really middleware web framework

## Example

```ts
import {route, middlestack} from "https://deno.land/x/middlestack/mod.ts";;

Deno.serve(middlestack([
    route('GET', '/', async (req: Request) => {
        return new Response("Hello world!")
    }),
]))
```
