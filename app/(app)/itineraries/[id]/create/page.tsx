/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { MapPin, Plus, ChevronLeft, Save, X, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { UploadButton } from "@/utils/uploadthing";
// import UploadPlaceholder from "@/components/uploadPlaceholder"
// import UploadFile from "@/components/uploadFile"
import { useSession } from "next-auth/react"
import clsx from "clsx"

const CreateRoute = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [photos, setPhotos] = useState([])
  const [urlPlaceholder, setUrlPlaceholder] = useState<any>()
  const [loading, setLoading] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      origin: "",
      destination: "",
      description: "",
      transportSteps: [
        {
          title: "",
          price: "",
          duration: "",
          details: "",
        },
      ],
      steps: [
        {
          title: "",
          description: "",
        },
      ],
      tips: [
        {
          description: "",
        },
      ],
    },
  })

  const origin = watch("origin")
  const destination = watch("destination")

  React.useEffect(() => {
    if (origin && destination) {
      setValue("title", `${origin} → ${destination}`)
    }
  }, [origin, destination, setValue])

  const handlePhotoChange = (index: number, url: string) => {
    const newPhotos: any = [...photos]
    newPhotos[index] = url
    setPhotos(newPhotos)
  }

  const {
    fields: transportFields,
    append: addTransportStep,
    remove: removeTransportStep,
  } = useFieldArray({
    control,
    name: "transportSteps",
  })

  const {
    fields: stepFields,
    append: addStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  })

  const {
    fields: tipsFields,
    append: addTip,
    remove: removeTip,
  } = useFieldArray({
    control,
    name: "tips",
  })

  // const calculateTotalPrice = (transportSteps) => {
  //   return transportSteps.reduce((total, step) => {
  //     return total + (parseFloat(step.price) || 0);
  //   }, 0);
  // };

  const calculateMinPrice = (transportSteps: any) => {
    return transportSteps.reduce((minPrice: any, step: any) => {
      const stepPrice = parseFloat(step.price) || 0
      return stepPrice < minPrice ? stepPrice : minPrice
    }, Infinity)
  }

  const calculateMaxPrice = (transportSteps: any) => {
    return transportSteps.reduce((maxPrice: any, step: any) => {
      const stepPrice = parseFloat(step.price) || 0
      return stepPrice > maxPrice ? stepPrice : maxPrice
    }, -Infinity)
  }

  const onSubmit = async (data: any) => {
    if (photos.length === 0) {
      alert("Por favor, adicione pelo menos uma foto")
      return
    }

    const minPrice = calculateMinPrice(data.transportSteps)
    const maxPrice = calculateMaxPrice(data.transportSteps)
    const filteredTips = data.tips
      .filter((tip: any) => tip.description.trim() !== "")
      .map((tip: any) => tip.description)

    const routeData = {
      title: `${data.origin} → ${data.destination}`,
      path: {
        origin: data.origin,
        destination: data.destination,
      },
      description: data.description,
      placeholderUrl: urlPlaceholder.url,
      groupIdPinataImages: urlPlaceholder.groupId,
      userId: session?.user?.id,
      photos: photos,
      transportSteps: data.transportSteps,
      steps: data.steps,
      tips: filteredTips,
      minPrice: minPrice,
      maxPrice: maxPrice,
    }

    try {
      setLoading(true)
      const response = await fetch("/api/createRoute", {
        method: "POST",
        body: JSON.stringify({ routeData }),
      })

      const { data: responseData } = await response.json()
      if (response.ok) {
        router.push(/itineraries/${responseData.id})
      }
    } catch (error) {
      console.error("Error creating route:", error)
      alert("Erro ao criar roteiro. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              className={clsx(
                " text-white px-6 py-2 rounded-lg font-medium  transition-colors flex items-center gap-2",
                {
                  "bg-orange-600 opacity-50 cursor-not-allowed": loading,
                  "bg-blue-600 hover:bg-blue-700": !loading,
                }
              )}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {loading ? "Salvando Roteiro" : "Salvar Roteiro"}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">Criar Novo Roteiro</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid max-md:grid-cols-1 grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Origem</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <input
                    type="text"
                    {...register("origin", {
                      required: "Origem é obrigatória",
                    })}
                    className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Ex: São Paulo"
                  />
                </div>
                {errors.origin && (
                  <p className="text-red-500 text-sm">
                    {errors.origin.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-2">Destino</label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <input
                    type="text"
                    {...register("destination", {
                      required: "Destino é obrigatório",
                    })}
                    className="flex-grow p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Ex: Rio de Janeiro"
                  />
                </div>
                {errors.destination && (
                  <p className="text-red-500 text-sm">
                    {errors.destination.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Descrição</label>
              <textarea
                {...register("description", {
                  required: "Descrição é obrigatória",
                })}
                className="w-full p-3 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Descreva seu roteiro..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block font-medium mb-2">Imagem de Capa</label>
            {/*  <UploadPlaceholder
                urlPlaceholder={urlPlaceholder ?? ""}
                changeUrl={(url: any) => setUrlPlaceholder(url)}
                groupName={{
                  name: ${origin} -> ${destination},
                  on: origin !== "" && destination !== "",
                }}
              /> */}
{ urlPlaceholder && <div className="w-full h-96 relative mb-5"> <Image
            src={urlPlaceholder.url}
            alt="Image from Pinata"
            crossOrigin="anonymous"
            fill
            className="object-fill"
          /></div>
}

<UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
setUrlPlaceholder({
 url: res,
  groupdId: "dkkasdkkasdkask"
})
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(ERROR! ${error.message});
        }}
      />
            </div>

            <div>
              {urlPlaceholder && (
                <>
                  <label className="block font-medium mb-2">
                    Fotos do Lugar (mínimo 1, máximo 3)
                  </label>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      {[0, 1, 2].map((index) => (
                        <UploadFile
                          key={index}
                          urlPhoto={photos[index]}
                          changeUrl={(url: any) =>
                            handlePhotoChange(index, url)
                          }
                          groupId={urlPlaceholder.groupId}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div>
              <label className="block font-medium mb-2">
                Opções de Transporte (mínimo 1)
              </label>
              <div className="space-y-4">
                {transportFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="relative p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <input
                          type="text"
                          {...register(transportSteps.${index}.title, {
                            required: "Título é obrigatório",
                          })}
                          className="w-full p-3 border rounded-lg"
                          placeholder="Título (ex: Ônibus Executivo)"
                        />
                        <input
                          type="text"
                          {...register(transportSteps.${index}.details)}
                          className="w-full p-3 border rounded-lg"
                          placeholder="Detalhes"
                        />
                      </div>
                      <div className="space-y-4">
                        <input
                          type="number"
                          {...register(transportSteps.${index}.price, {
                            required: "Preço é obrigatório",
                          })}
                          className="w-full p-3 border rounded-lg"
                          placeholder="Preço"
                        />
                        <input
                          type="time"
                          {...register(transportSteps.${index}.duration, {
                            required: "Duração é obrigatória",
                          })}
                          className="w-full p-3 border rounded-lg"
                          placeholder="Duração"
                        />
                      </div>
                    </div>
                    {transportFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTransportStep(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addTransportStep({
                      title: "",
                      price: "",
                      duration: "",
                      details: "",
                    })
                  }
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Adicionar Transporte
                </button>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Passo a Passo</label>
              <div className="space-y-4">
                {stepFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="relative p-4 bg-gray-50 rounded-lg"
                  >
                    <input
                      type="text"
                      {...register(steps.${index}.title, {
                        required: "Título é obrigatório",
                      })}
                      className="w-full p-3 border rounded-lg mb-4"
                      placeholder="Título do passo"
                    />
                    <textarea
                      {...register(steps.${index}.description, {
                        required: "Descrição é obrigatória",
                      })}
                      className="w-full p-3 border rounded-lg h-24"
                      placeholder="Descrição detalhada do passo"
                    />
                    <button
                      type="button"
                      onClick={() => removeStep(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addStep({ title: "", description: "" })}
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Adicionar Passo
                </button>
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Dicas (Opcional)</label>
              <div className="space-y-4">
                {tipsFields.map((field, index) => (
                  <div key={field.id} className="relative">
                    <textarea
                      {...register(tips.${index}.description)}
                      className="w-full p-3 border rounded-lg h-24"
                      placeholder="Digite uma dica importante..."
                    />
                    <button
                      type="button"
                      onClick={() => removeTip(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    addTip({
                      description: "",
                    })
                  }
                  className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Adicionar Dica
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateRoute
