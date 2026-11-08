import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createHash, timingSafeEqual } from 'node:crypto'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

const JWKS_PATH = '/api/auth/jwks'

// Compare hashes so the check takes the same time for every input.
// This stops someone from guessing the secret byte by byte.
function safeEqual(a: string, b: string) {
  const left = createHash('sha256').update(a).digest()
  const right = createHash('sha256').update(b).digest()
  return timingSafeEqual(left, right)
}

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    // JWKS is service-to-service only: the Express backend must send
    // `x-jwks-key`. Browsers, jwt.io, and other websites cannot read it.
    if (request.nextUrl.pathname === JWKS_PATH) {
        const expected = process.env.JWKS_ACCESS_KEY
        const provided = request.headers.get('x-jwks-key')

        if (!expected) {
            console.error('[proxy] JWKS_ACCESS_KEY is not configured')
            return NextResponse.json(
                { error: 'JWKS is not configured' },
                { status: 503 }
            )
        }

        if (!provided || !safeEqual(provided, expected)) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        return NextResponse.next()
    }

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user
    if(!user){
     return NextResponse.redirect(new URL('/login', request.url))
    }


}


export const config = {
  matcher: ['/add-destination', '/my-bookings', '/destinations/:path', '/api/auth/jwks' ],
}