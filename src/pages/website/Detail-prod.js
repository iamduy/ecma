import { parseRequestUrl, $ } from "../../until"
import productAPI from "../../api/productAPI"
import footer from "../../components/website/Footer"
import Header from "../../components/website/Header"
import categoryAPI from '../../api/categoryAPI'
import { add_cart } from '../../cart'
const Detail = {
  async render() {
    window.scrollTo(0, 0);
    const { id } = parseRequestUrl();
    const { data: prod } = await productAPI.get(id);
    const { data: products } = await productAPI.getAll();
    const { data: categories } = await categoryAPI.getAll();
    const slice = products.slice(0, 3);
    const slice_feature = products.slice(0, 10);

    //list danh mục
    const cate = categories.map(cate => {
      return /* html */ `
      <ul class="py-3 hind font-semibold">
          <li class="transition duration-500 ease-in-out transform hover:scale-110 hover:text-red-400 text-sm text-gray-900">
          <a href="/#/category/${cate.id}">${cate.name}</a>
          </li>
      </ul>
      `
    }).join("");

    // list sản phẩm mới thêm   
    const product = slice.map((prod) => {


      return /* html */ `

      <div class="w-full max-w-sm mx-auto overflow-hidden shadow-lg cursor-pointer">
      <a href="/#/products/${prod.id}">
        <img src="${prod.image}" alt="" class="rounded-t">
      </a>
      <div class="p-4">
            <a href="/#/products/${prod.id}">
              <h2 class="font-bold hind uppercase text-center hover:text-red-400 transition duration-500">${prod.name}</h2>
              <p class="font-light text-gray-500 text-lg my-2 text-center">${prod.price} &dollar;</p>
           </a>
      
           <button data-id='${prod.id}' class="inline-block w-full p-2 text-xs font-medium leading-6 text-center text-white uppercase transition duration-500 bg-red-400 hover:bg-white hover:border-gray-200 hover:text-gray-900 border focus:outline-none border-red-400 add-to-cart">
           Add to cart
         </button>
      </div>
</div>

             `;
    }).join("");

    const feature = slice_feature.map((items) => {

      if (items.feature == 1) {

        return /* html */`
      <article class="sm:grid grid-cols-4 bg-white p-4 lg:col-span-2">
            <a href="/#/products/${items.id}" class="transform transition duration-500 hover:scale-125">
                <img src="${items.image}" class="w-full">
            </a>
            <div class="pt-5 self-center sm:pt-0 sm:pl-5 col-span-3">
              <p class="text-gray-900 hover:text-red-400 capitalize text-sm font-normal lora transition delay-150 else-in-out">
                <a href="/#/products/${items.id}">${items.name}</a>
              </p>              
              <p class="text-gray-500 text-xs pt-1">$ ${items.price}</p>
              <p class="text-gray-500 text-xs pt-1">on December 12, 2021</p>
            </div>
      </article>
        `;
      }
    }).join("");

    return /* html */ `    

        ${Header.render()}
        <div class="container mx-auto py-6 px-20 my-10">
            <div class="md:flex no-wrap md:-mx-2">

            <div class="xl:w-9/12 w-full mt-8 mx-4">
                  <!-- component -->
                <section class="text-gray-700 body-font overflow-hidden bg-white">
                
                  <div class="mx-auto flex flex-wrap">
                    <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="${prod.image
      }">

                    <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                      <h2 class="text-gray-900 text-3xl title-font lora font-medium mb-1">${prod.name
      }</h2>

                      <span class="title-font font-medium text-2xl text-gray-900 hind">$ ${prod.price}</span>

                      <p class="leading-relaxed py-4 hind">${prod.intro}</p>
                      <div class="border-gray-700 border-b mb-3"></div>
                      <div class="flex">
                        

                      <button data-id='${prod.id}' class="inline-block w-full p-2 text-xs font-medium leading-6 text-center text-white uppercase transition duration-500 bg-red-400 hover:bg-white hover:border-gray-200 hover:text-gray-900 border focus:outline-none border-red-400 add-to-cart">
                      Add to cart
                    </button>

                      </div>
                    </div>
                  </div>
              </section>


              <!--recent product-->
                  <div class="my-10">
                        <h2 class="lora font-normal text-2xl mb-2">Recent Products</h2>
                        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            ${await product}
                        </div>
                  </div>

            </div>
            <div class="xl:w-3/12 w-full mt-8 mx-4">
                    <!--search products-->
                <form class="mb-2">
                    <input class="p-2 w-full text-gray-800 border border-gray-200 focus:outline-none mb-2" type="text" id="search" placeholder=" Search products">

                    <button type="submit" class="inline-block w-full p-2 text-xs font-medium leading-6 text-center text-white uppercase transition duration-500 bg-red-400 hover:bg-white hover:border-gray-200 hover:text-gray-900 border focus:outline-none border-red-400">
                    search
                  </button>
                
                </form>
                <!--categories-->
                <div class="border border-gray-200">
                    <h4 class="hind uppercase font-semibold text-center py-4">Categories</h4>
                    <div class="divide-y divide-light-blue-400 px-6">${cate}</div>
                </div>

                <!-- featured products -->
                <div class="mt-12 border border-gray-200">
                  <h3 class="uppercase lora font-semibold text-center p-3 text-sm">
                    featured products
                  </h3>
                  ${await feature}
                </div>

            </div>

            </div>
            
            
        </div>

        ${footer.render()}
        `;
  },
  async afterRender() {
    await Header.afterRender();
    add_cart(Detail);
  }

};
export default Detail;
