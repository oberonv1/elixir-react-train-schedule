defmodule Mbta.ScheduleChannel do
  use Mbta.Web, :channel

  def join("schedule", _params, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  #message through socket MUST be a map
  def handle_info(:after_join, socket) do
    push(socket, "init", %{"schedule" => Mbta.Schedule.state()})
    {:noreply, socket}
  end
  def handle_info(%{event: event}, socket) when event == "updated" do
    push(socket, event, %{"schedule" => Mbta.Schedule.state()})
    {:noreply, socket}
  end

end