# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
			Dynamic assets: The components of a web page changes based on the user's input, example: location, time etc. 
			
			Static assets: Parts of the webpage that dont change. Example: Javascript files, stylesheets, images, logos in the webpage, html layout.
			
## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
			Abolute file paths: 1) are on the same server but follow a different path.
								2) always includes the domain name of the website, absolute path specifies a fully qualified URL.
			Relative file paths: 1) are based on the navigation from the path of the currently loaded page.
								 2) they link to the point to a file or a file path.
								 
			webserver root/document root is the short version of the absolute path, because the page "document root" is located one directory above the current directory.
			
## Q: What is the difference between server-side and client-side JS?
			Server-side JS: the code is run on the server, then its pages are downloaded and displayed in the browser.
		Client-side JS: the code is run on the user's computer - When a web page is viewed, the page's client-side code is downloaded, then run and displayed by the browser.
		
## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
			var: The scope of the variable defined with the keyword "var" is limited to the function within which it is defined. If it is defined outside any function, the scope of the variable is global.
				 If we want to use a variable only in a function block then we can assign it as "var". 
			
			let: The scope of the variable defined with the keyword "let" is limited to the block defined by curly braces.
				 Use "let" when you want to limit the scope of the variable to a code block within which it is defined. 
			
			const: The scope of the variable defined with the keyword "let" is limited to the block defined by curly braces. And the varible defined with const cannot be re-assigned.
				 "const" is used for variables whose value is fixed and should not be changed.
				 
## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
			1) Constructor pattern: They are called with the new keyword and bind the "this" keyword to the object being created by the constructor function.
			2) Class definition: This  method combines the constructor, static and the prototype method declarations into a block.
			3) Explicit prototype declaration, Object.create method factory: In this method the prototypes are explicitly defined. Object.create allows the creation of an object with a specific prototype.
			4) Object.create, top-level factory, prototype post-declaration: This method is a slight variation of Method3, where the factory is the class, versus the class being an object with a factory method.
				 It looks like the constructor in Method1, but uses factories and Object.create instead.
				 
## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".
		// Using classes
		class CatType { 
		  constructor(name) {
		    this.name = name;
		  }
		  purr() {
		    return("purr");
		  }
		}
		class PersianCat extends CatType {
		  constructor(name) {
		    super(name);
		  }
		}
		let pc = new PersianCat('simbu');
		// Returns "purr" as defined in the inherited class.
		pc.purr();
		// Inherit through prototype
		PersianCat.prototype = CatType.prototype;
		
## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".
		function SnakeType(type) {
		    this.type = name;
		}
		SnakeType.prototype.hiss = function () {
		    return "hiss";
		}
		function Rattle(name) {
		    SnakeType.call("Rattle");
			this.name = name;
		}
		// Link prototypes
		Rattle.prototype = Object.create(SnakeType.prototype);
		// Instantiate new snake object
		const localSnake = new Rattle("Long Rattler");
		// Return "Rattle" from inherited SnakeType
		localSnake.hiss();
		
## Q: Explain what a callback is, and give an example.
			A callback is a function passed to another function, so that the receiving function gets control over: how many times to call the callback, when to call the callback, and when to pass in the call to the call back
			
			Example:
			
			  function doHomeWork(subject, callback){
			  	alert(`starting my ${subject} homework.`);
				callback();
			  }
			  
			  function alertFinished(){
			  	alert(`finished my homwwork`);
			  }
			  
			  doHomeWork('Webtools', alertfinished);
			  
## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is `_arrow function_`, then `this` will not have the expected implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
		you should name the class based on what it is and not based on what it looks like.
		The name of the class should be generic so we can reuse it whenever required. And the class names should follow standand practices.
		
		Example: 
		.redBox {  border: 1px solid red;}   // poorly named
		.red-box {   border: 1px solid red;}  // well named
		