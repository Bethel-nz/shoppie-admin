import * as z from 'zod'

const formSchema = z.object({
	name:z.string().min(1)
})

export default formSchema