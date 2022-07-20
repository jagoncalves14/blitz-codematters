import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const CreateTodo = z.object({
  name: z.string(),
  completed: z.boolean(),
})

export default resolver.pipe(resolver.zod(CreateTodo), resolver.authorize(), async (input, ctx) => {
  const payload = {
    ...input,
    authorId: ctx.session.userId,
  }

  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const todo = await db.todo.create({ data: payload })

  return todo
})
