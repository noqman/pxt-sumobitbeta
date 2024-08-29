// Default pin.
const POTENTIO_BIT_PIN = DigitalPin.P2;

// Event source.
const POTENTIO_BIT_EVENT_SOURCE = EventBusSource.MICROBIT_ID_IO_P2;

// Comparison type.
enum PotCompareType {
    //% block=">"
    MoreThan = 0,

    //% block="<"
    LessThan = 1
};

/**
  * Return potentiometer value (0-1023).
  */
//% weight=20
//% blockGap=8
//% blockId=edubit_read_pot_value
//% block="potentiometer value"
function readPotValue(): number {
    return pins.digitalReadPin(POTENTIO_BIT_PIN);
}