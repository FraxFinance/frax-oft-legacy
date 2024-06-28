import { ExecutorOptionType } from '@layerzerolabs/lz-v2-utilities'
import { OAppEnforcedOption } from '@layerzerolabs/ua-devtools'

export const getDefaultEnforcedOptions = (): OAppEnforcedOption[] => {
    return [
        //send
        {
            msgType: 1,
            optionType: ExecutorOptionType.LZ_RECEIVE,
            gas: '80000',
        },
        // sendCompose
        {
            msgType: 2,
            optionType: ExecutorOptionType.LZ_RECEIVE,
            gas: '140000',
        },
    ]
}
