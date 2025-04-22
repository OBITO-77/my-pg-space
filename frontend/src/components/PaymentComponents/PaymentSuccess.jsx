// import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { useSearchParams } from "react-router-dom"
const PaymentSuccess = () => {

    const seachQuery = useSearchParams()[0]

    const referenceNum = seachQuery.get("reference")
    return (
        <div>
            <div className="flex justify-center">

                <div> Order Successfull</div>

                <div>
                    Reference No.{referenceNum}
                </div>

            </div>
        </div>
    )
}

export default PaymentSuccess