import { useEffect, useState } from "react"
import RouteCard from "./routeCard"
import { Loader2 } from "lucide-react"
import clsx from "clsx"

export default function GridCards({
  activeTab,
  filter,
}: {
  activeTab: string
  filter: string
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [filtered, setFiltered] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        if (activeTab === "local") {
          const response = await fetch("/api/getRoles")
          if (!response.ok) {
            throw new Error("Erro ao buscar os roles")
          }
          const roles = await response.json()

          setData(roles)
        } else {
          const response = await fetch("/api/getItineraries")
          if (!response.ok) {
            throw new Error("Erro ao buscar os roteiros")
          }
          const { itineraries } = await response.json()

          setData(itineraries)
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [activeTab])

  useEffect(() => {
    if (filter) {
      const filteredData = data.filter((item) => {
        return item.title.toLowerCase().includes(filter.toLowerCase())
      })
      setFiltered(filteredData)
    } else {
      setFiltered(data)
    }
  }, [data, filter])

  return (
    <div>
      {loading ? (
        <div className=" flex items-center justify-center h-full  ">
          <Loader2 className="animate-spin" size={50} />
        </div>
      ) : (
        <div>
          {filtered.length > 0 ? (
            <div
              className={clsx("  gap-10 px-10", {
                "flex items-center justify-center": filtered.length <= 1,
                "grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]":
                  filtered.length > 1,
              })}
            >
              {filtered.map((item) => {
                return <RouteCard route={item} key={item.id} />
              })}
            </div>
          ) : (
            <div>
              <h3>Nenhum roteiro disponível</h3>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
