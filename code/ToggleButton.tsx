import * as React from "react"

import { Frame, addPropertyControls, ControlType, motion } from "framer"
import { useState, useEffect } from "react"

interface Props {
    onClick?: (toggled: boolean, value: number) => void
    onTap?: (toggled: boolean, value: number) => void

    width?: number
    height?: number

    borderColor?: string
    activeColor?: string
    activeBGcolor?: string

    baseValue?: number
    image?: string
}

export const GridToggle = (props: Props) => {
    const {
        width,
        height,
        borderColor,
        activeColor,
        activeBGcolor,
        image,
        baseValue,
    } = props

    const [toggled, setToggled] = useState(false)
    const [pressed, setPressed] = useState(false)

    return (
        <motion.div
            style={{
                width: width,
                height: height,
                overflow: "hidden",
                borderRadius: "100%",
                backgroundColor: "#f0f0f0",
                boxShadow: `inset 0px 0px 6px 0px rgba(0,0,0, 0.2)`,
                border: toggled
                    ? `3px solid ${borderColor}`
                    : `3px solid transparent`,
                boxSizing: "border-box",
                transform: `scale(${pressed ? 0.94 : 1.0})`,
                transition: "transform 0.25s, background 0.25s, border 0.25s",
                cursor: "pointer",
            }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onTap={() => {
                const toggleStatus = !toggled
                setToggled(toggleStatus)

                if (props.onTap) props.onTap(toggleStatus, baseValue)
                if (props.onClick) props.onClick(toggleStatus, baseValue)
            }}
        >
            <motion.div
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    top: "50%",
                    left: "50%",
                    borderRadius: "50%",
                    transform: `translate(-50%, -50%) scale(${
                        toggled ? 1 : 0.75
                    })`,
                    opacity: toggled ? 1 : 0,
                    transition: "transform 0.45s, opacity 0.85s",
                    backgroundColor: activeBGcolor,
                }}
            />
            <motion.div
                initial={{
                    x: "12.5%",
                    y: "12.5%",

                    opacity: toggled ? 1 : 0,
                    scale: toggled ? 1.0 : 0.85,
                }}
                animate={{
                    opacity: toggled ? 1 : 0,
                    scale: toggled ? 1.0 : 0.85,
                }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 16,
                }}
                style={{
                    width: "80%",
                    height: "80%",
                    zIndex: 10,
                    borderRadius: "50%",
                    boxShadow: `0px 0px 5px 0px rgba(0,0,0, 0.25)`,
                }}
            />
        </motion.div>
    )
}

GridToggle.defaultProps = {
    width: 70,
    height: 70,
    baseValue: 1,
    borderColor: "#ccc",
    activeColor: "#ccc",
    activeBGcolor: "purple",
}

addPropertyControls(GridToggle, {
    image: {
        title: "Image",
        type: ControlType.Image,
    },
    baseValue: {
        title: "Base value",
        type: ControlType.Number,
        min: 1,
        max: 90000,
        displayStepper: true,
    },
    borderColor: {
        title: "Border color",
        type: ControlType.Color,
    },
    activeColor: {
        title: "Border color",
        type: ControlType.Color,
    },
    activeBGcolor: {
        title: "Active BG color",
        type: ControlType.Color,
    },
})

export default GridToggle
