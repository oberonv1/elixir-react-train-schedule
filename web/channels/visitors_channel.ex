defmodule Mbta.VisitorsChannel do
  use Mbta.Web, :channel

  def join("visitors", _params, socket) do
    send(self, :after_join)
    {:ok, socket}
  end

  def handle_info(:after_join, socket) do
    push(socket, "init", Mbta.Visitors.state())
    {:ok, _} = Mbta.Visitors.add()
    {:noreply, socket}
  end
  def handle_info(%{event: event}, socket) when event in ["add", "remove"] do
    push(socket, event, %{})
    {:noreply, socket}
  end

  def terminate(_, _) do
    {:ok, _} = Mbta.Visitors.remove()
    :ok
  end
end