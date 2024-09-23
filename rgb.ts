/*******************************************************************************
 * Functions for RGB LED.
 *
 * Company: Cytron Technologies Sdn Bhd
 * Website: http://www.cytron.io
 * Email:   support@cytron.io
 *******************************************************************************/

// RGB Colors
enum RgbColors {
    //% block=red
    Red = 0xFF0000,
    //% block=orange
    Orange = 0xFFA500,
    //% block=yellow
    Yellow = 0xFFFF00,
    //% block=green
    Green = 0x00FF00,
    //% block=blue
    Blue = 0x0000FF,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xFF00FF,
    //% block=white
    White = 0xFFFFFF,
    //% block=black
    Black = 0x000000
}



namespace sumobit {
 

    /**
     * Turn off all RGB pixels.
     */
    //% group="RGB LED"
    //% weight=13
    //% blockGap=8
    //% blockId="sumobit_clear_all_rgb_pixels"
    //% block="clear all RGB pixels"
    export function clearAllRgbPixels(): void {
    
    sumobit.i2cWrite(REG_ADD_R0, 0);
    sumobit.i2cWrite(REG_ADD_G0, 0);
    sumobit.i2cWrite(REG_ADD_B0, 0);

    sumobit.i2cWrite(REG_ADD_R1, 0);
    sumobit.i2cWrite(REG_ADD_G1, 0);
    sumobit.i2cWrite(REG_ADD_B1, 0);

    }


    /**
     * Set the brightness of the RGB pixels (0-255).
     * @param brightness Pixel brightness. eg: 25
     */
    //% group="RGB LED"
    //% weight=12
    //% blockGap=40
    //% blockId="sumobit_set_rgb_brightness"
    //% block="set RGB pixels brightness to %brightness"
    //% brightness.min=0 brightness.max=255
    //% blockHidden=true
    export function setRgbBrightness(brightness: number): void {
    
    }


    /**
     * Show the same color on all RGB pixels. 
     * @param color RGB color of the pixel.
     */
    //% group="RGB LED"
    //% weight=11
    //% blockGap=8
    //% blockId="sumobit_set_all_rgb_pixels_color"
    //% block="set all RGB pixels to %color"
    //% color.shadow="colorNumberPicker"
    export function setAllRgbPixelsColor(color: number): void {

    // Extract the RGB values
    let red = (color >> 16) & 0xFF;   // Shift right by 16 bits and mask with 0xFF
    let green = (color >> 8) & 0xFF;  // Shift right by 8 bits and mask with 0xFF
    let blue = color & 0xFF;

    sumobit.i2cWrite(REG_ADD_R0, red);
    sumobit.i2cWrite(REG_ADD_G0, green);
    sumobit.i2cWrite(REG_ADD_B0, blue);

    sumobit.i2cWrite(REG_ADD_R1, red);
    sumobit.i2cWrite(REG_ADD_G1, green);
    sumobit.i2cWrite(REG_ADD_B1, blue);

    }


    /**
     * Show color on individual RGB pixel.
     * @param pixel The pixel number we want to change the color.
     * @param color RGB color of the pixel.
     */
    //% group="RGB LED"
    //% weight=10
    //% blockGap=40
    //% blockId="sumobit_set_rgb_pixel_color"
    //% block="set RGB pixel %pixel to %color"
    //% color.shadow="colorNumberPicker"
    //% pixel.min=0 pixel.max=1
    export function setRgbPixelColor(pixel: number, color: number): void {
    
    // Extract the RGB values
    let red = (color >> 16) & 0xFF;   // Shift right by 16 bits and mask with 0xFF
    let green = (color >> 8) & 0xFF;  // Shift right by 8 bits and mask with 0xFF
    let blue = color & 0xFF;
    
    switch (pixel) {
        case 0:
        sumobit.i2cWrite(REG_ADD_R0, red);
        sumobit.i2cWrite(REG_ADD_G0, green);
        sumobit.i2cWrite(REG_ADD_B0, blue);
        break;

        case 1:
        sumobit.i2cWrite(REG_ADD_R1, red);
        sumobit.i2cWrite(REG_ADD_G1, green);
        sumobit.i2cWrite(REG_ADD_B1, blue);
        break;
    
    }
    }



    /**
     * Return the RGB value of a known color.
    */
    //% group="RGB LED"
    //% weight=9
    //% blockGap=8
    //% blockId="sumobit_colors"
    //% block="%color"
    export function colors(color: RgbColors): number {
        return <number>color;
    }


    /**
     * Converts red, green, blue channels into a RGB color.
     * @param red Value of the red channel (0 - 255). eg: 255
     * @param green Value of the green channel (0 - 255). eg: 255
     * @param blue Value of the blue channel (0 - 255). eg: 255
     */
    //% group="RGB LED"
    //% weight=8
    //% blockGap=30
    //% blockId="sumobit_rgb_value"
    //% block="red %red green %green blue %blue"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    export function rgb(red: number, green: number, blue: number): number {
        // Limit the value.
        red = sumobit.limit(red, 0, 255);
        green = sumobit.limit(green, 0, 255);
        blue = sumobit.limit(blue, 0, 255);

        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    }