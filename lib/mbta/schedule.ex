defmodule Mbta.Schedule do
  use GenServer
  require HTTPotion

  def start_link() do
    GenServer.start_link(__MODULE__,  [], name: __MODULE__)
  end

  def state, do: GenServer.call(__MODULE__, :state)

  def init(_args) do
    schedule =
              HTTPotion.get!("http://developer.mbta.com/lib/gtrtfs/Departures.csv", timeout: 20000)
              |> Map.fetch!(:body)
              |> String.split("\n", trim: true)
    schedule_work() # Schedule work to be performed at some point
    {:ok, schedule}
  end

  def handle_info(:work, state) do
    schedule =
              HTTPotion.get!("http://developer.mbta.com/lib/gtrtfs/Departures.csv", timeout: 20000)
              |> Map.fetch!(:body)
              |> String.split("\n", trim: true)
    Phoenix.PubSub.broadcast(Mbta.PubSub, "schedule", %{event: "updated"})
    schedule_work() # Reschedule once more
    {:noreply, schedule}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 60 * 1000) # In one minute
  end

  def handle_call(:state, _, state) do
      {:reply, state, state}
  end
end