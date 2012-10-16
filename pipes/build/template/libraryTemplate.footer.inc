	
 	/* implementation end */
 	 
 	// define the puremvc global namespace and export the actors
 	scope.puremvc.pipes =
 	{
 		PipeMessage: PipeMessage
 	,	Message: Message
 	,	FilterControlMessage: FilterControlMessage
 	,	QueueControlMessage: QueueControlMessage
 	,	PipeFitting: PipeFitting
 	,	PipeListener: PipeListener
 	,	Pipe: Pipe
 	,	Filter: Filter
 	,	Junction: Junction
 	,	JunctionMediator: JunctionMediator
 	,	PipeAware: PipeAware
 	,   Queue: Queue
 	,   TeeMerge: TeeMerge
 	,   TeeSplit: TeeSplit
 	}; 
 	
})(this); // the 'this' parameter will resolve to global scope in all environments
