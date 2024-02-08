import * as z from 'zod'

const formSchema = z.object({
	name:z.string().min(1)
})

const billboardSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

export { formSchema , billboardSchema}