import { describe, it } from 'node:test'
import * as assert from 'node:assert'
import { spy } from 'fpts/function'
import barebones_bearer from './dist/barebones-bearer.js'

describe('barebones-bearer', () => {
    it('should reject invalid requests', () => {
        const cases = [
            undefined,
            '',
            'Bearar test',
            'Bearer',
            'Bearertest',
            'Bearer tast',
            'Bearer testt',
        ]
        for (const c of cases) {
            const req = {
                headers: {
                    authorization: c,
                }
            }
            const res = {
                writeHead: spy(() => res),
                end: spy(() => res),
            }

            barebones_bearer.default('test', () => { throw new Error('unreachable') })(req, res)

            assert.equal(res.writeHead.calls.length, 1)
            assert.deepEqual(res.writeHead.calls, [[401]])
            assert.equal(res.end.calls.length, 1)
        }
    })

    it('should run callback on valid requests', () => {
        const req = {
            headers: {
                authorization: 'Bearer test',
            }
        }
        const res = {
            writeHead: spy(() => res),
            end: spy(() => res),
        }

        barebones_bearer.default('test', (req, res) => { res.writeHead(200).end('Yo') })(req, res)

        assert.equal(res.writeHead.calls.length, 1)
        assert.deepEqual(res.writeHead.calls, [[200]])
        assert.equal(res.end.calls.length, 1)
        assert.deepEqual(res.end.calls, [['Yo']])
    })
})
