/**
 * @author sunag / http://www.sunag.com.br/
 */

import { GLNode } from '../core/GLNode.js';
 
function SwitchNode( node, components ) {

	GLNode.call( this );

	this.node = node;
	this.components = components || 'x';

};

SwitchNode.prototype = Object.create( GLNode.prototype );
SwitchNode.prototype.constructor = SwitchNode;
SwitchNode.prototype.nodeType = "Switch";

SwitchNode.prototype.getType = function ( builder ) {

	return builder.getFormatFromLength( this.components.length );

};

SwitchNode.prototype.generate = function ( builder, output ) {

	var type = this.node.getType( builder ),
		node = this.node.build( builder, type ),
		inputLength = builder.getFormatLength( type ) - 1;

	if ( inputLength > 0 ) {

		// get max length

		var outputLength = 0,
			components = builder.colorToVector( this.components );

		var i, len = components.length;

		for ( i = 0; i < len; i ++ ) {

			outputLength = Math.max( outputLength, builder.getIndexByElement( components.charAt( i ) ) );

		}

		if ( outputLength > inputLength ) outputLength = inputLength;

		// split

		node += '.';

		for ( i = 0; i < len; i ++ ) {

			var elm = components.charAt( i );
			var idx = builder.getIndexByElement( components.charAt( i ) );

			if ( idx > outputLength ) idx = outputLength;

			node += builder.getElementByIndex( idx );

		}

		return builder.format( node, this.getType( builder ), output );

	} else {

		// join

		return builder.format( node, type, output );

	}

};

SwitchNode.prototype.copy = function ( source ) {
			
	GLNode.prototype.copy.call( this, source );
	
	this.node = source.node;
	this.components = source.components;
	
};

SwitchNode.prototype.toJSON = function ( meta ) {

	var data = this.getJSONNode( meta );

	if ( ! data ) {

		data = this.createJSONNode( meta );

		data.node = this.node.toJSON( meta ).uuid;
		data.components = this.components;

	}

	return data;

};

export { SwitchNode };
