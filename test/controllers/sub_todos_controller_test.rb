require 'test_helper'

class SubTodosControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get sub_todos_index_url
    assert_response :success
  end

  test "should get create" do
    get sub_todos_create_url
    assert_response :success
  end

  test "should get update" do
    get sub_todos_update_url
    assert_response :success
  end

  test "should get destroy" do
    get sub_todos_destroy_url
    assert_response :success
  end

end
