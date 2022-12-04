import { createSignal, createEffect } from "solid-js"
import { inView, InViewOptions } from "@motionone/dom"

interface Options extends Omit<InViewOptions, "root" | "amount"> {
    root?: Element
    once?: boolean
    amount?: "some" | "all" | number
}

export function useInView(
    ref: Element,
    { root, margin, amount, once = false }: Options = {}
) {
    const [isInView, setInView] = createSignal(false)

    createEffect(() => {
        if (!ref || (once && isInView)) return

        const onEnter = () => {
            setInView(true)

            return once ? undefined : () => setInView(false)
        }

        const options: InViewOptions = {
            root: (root && root) || undefined,
            margin,
            amount: amount === "some" ? "any" : amount,
        }

        return inView(ref, onEnter, options)
    }, [root, ref, margin, once])

    return isInView
}