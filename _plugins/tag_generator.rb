# Ref: https://www.untangled.dev/2020/06/02/tag-management-jekyll/
# If I've added incorrect tags, simply delete all contents in the `/tags` folder 

# Uncomment the below when new tags are added

# Jekyll::Hooks.register :posts, :post_write do |post|
#     all_existing_tags = Dir.entries("tags")
#       .map { |t| t.match(/(.*).md/) }
#       .compact.map { |m| m[1] }
  
#     tags = post['tags'].reject { |t| t.empty? }
    
#     tags.each do |tag|
#     puts tag
#       generate_tag_file(tag) if !all_existing_tags.include?(tag)
#     end

#   end
  
#   def generate_tag_file(tag)
#     # generate tag file
#     tag = tag.downcase
#     File.open("tags/#{tag}.md", "wb") do |file|
#       file << "---\nlayout: tags\ntag-name: #{tag}\n---\n"
#     end
#   end

# Jekyll::Hooks.register :site, :post_write do |site|
#     all_existing_tags = Dir.entries("tags")
#       .map { |t| t.match(/(.*).md/) }
#       .compact.map { |m| m[1] }
    
#     projects = site.data['project-data']
#     tags =  []
    
#     projects.each do |project|
#         project["topics"]["names"].each do |tag|
#             tags.push(tag)
#         end
#     end 
    
#     # puts tags
    

#     tags.each do |tag|
#       generate_tag_file(tag) if !all_existing_tags.include?(tag)
#     end

#   end
  
#   def generate_tag_file(tag)
#     # generate tag file
#     tag = tag.downcase
#     File.open("tags/#{tag}.md", "wb") do |file|
#       file << "---\nlayout: tags\ntag-name: #{tag}\n---\n"
#     end
#   end


