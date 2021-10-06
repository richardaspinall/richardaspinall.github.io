# Ref: https://www.untangled.dev/2020/06/02/tag-management-jekyll/
# If I've added incorrect categories, simply delete all contents in the `blog/categories` folder 

# Uncomment the below when new categories are added

# Jekyll::Hooks.register :posts, :post_write do |post|
#     all_existing_categories = Dir.entries("blog/categories")
#         .map { |t| t.match(/(.*).md/) }
#         .compact.map { |m| m[1] }

#     categories = post['categories'].reject { |t| t.empty? }
#     categories.each do |category|
#         generate_category_file(category) if !all_existing_categories.include?(category)
#     end
#     end

#     def generate_category_file(category)
#     # generate category file
#     category = category.downcase

#     File.open("blog/#{category}.md", "wb") do |file|
#         file << "---\nlayout: categories\ncategory-name: #{category}\n---\n"
#     end
#     end