# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
@user_counter = User.count
4.times do
  @user_counter += 1
  puts @user_counter
  password = 'password'
  User.create!(
    email: "test#{@user_counter}@test.com", 
    name: Faker::Name.name,
    image: Faker::Avatar.image(slug: "my-own-slug", size: "50x50"),
    nickname: Faker::Name.first_name,
    password: password, 
    password_confirmation: password,
    nickname: Faker::Internet.username,
  )
  10.times do
    Post.create(
      body: Faker::Lorem.sentences(number: 1),
      user_id: @user_counter,
      date: Faker::Time.backward(days = 365, period = :all, format: :long)
    )
  end
  puts "username: test#{@user_counter}@test.com, password:#{password} created with 10 posts"
  puts @user_counter
end

puts 'seeded'
