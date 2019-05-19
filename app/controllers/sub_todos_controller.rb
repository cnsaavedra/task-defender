class SubTodosController < ApplicationController
  def index
    subtodos = SubTodo.order("created_at DESC")
    render json: subtodos
  end

  def create
    subtodo = SubTodo.create(subtodo_param)
    render json: subtodo
  end

  def update
    subtodo = SubTodo.find(params[:id])
    subtodo.update_attributes(subtodo_param)
    render json: subtodo
  end

  def destroy
    subtodo = SubTodo.find(params[:id])
    subtodo.destroy
    head :no_content, status: :ok
  end
  
  private
    def subtodo_param
      params.require(:subtodo).permit(:todo_id, :title, :done, :health, :power)
    end
end