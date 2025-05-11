
import { OverviewCards } from "../overview/OverviewCards"
import { SatisfactionPieChart } from "../charts/SatisfactionPieChart"
import { DepartmentsBarChart } from "../charts/DepartmentsBarChart"
import { TrendsLineChart } from "../charts/TrendsLineChart"

export function AdminDashboard() {
  return (
    <>
      <OverviewCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SatisfactionPieChart />
        <DepartmentsBarChart />
      </div>
      <div className="grid grid-cols-1 gap-6">
        <TrendsLineChart />
      </div>
    </>
  )
}
