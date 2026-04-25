"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import InputField from "~/component/atoms/InputField"
import { z } from "zod"
import { setting } from "../actions/setting"

const schema = z.object({
  url: z.string().min(1, "必須入力です").pipe(z.url("URL形式が正しくありません")),
})
type FormValues = z.infer<typeof schema>

export default function SettingPage() {
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
  })

  const onSubmit = async () => {
    try {
      const submitData = getValues()
      await setting(submitData.url)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Local-Stack Viewer</h1>
          <p className="py-6">
            This service allows you to visually utilize services within local-stack.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                <div>
                  <InputField
                    {...register("url")}
                    hintText="URLを入力してください"
                    errorMessage={errors.url?.message}
                    placeholder="LocalStack URL"
                  />
                </div>
                <button className="btn btn-neutral mt-4">Submit</button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
