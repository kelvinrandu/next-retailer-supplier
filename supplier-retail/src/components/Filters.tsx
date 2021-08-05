import { Stack} from '@chakra-ui/react';
import React from 'react';
import Btn from "./Btn";


function Filters() {
    return (
        <div>
            <Stack direction="row" spacing={4} align="center" py={3}>
            <Btn value="vegetables"/>
            <Btn value="fruits"/>
            <Btn value="watches"/>
            <Btn value="fast food"/>
            <Btn value="Suppliers"/>
            </Stack>
            
        </div>
    )
}

export default Filters
