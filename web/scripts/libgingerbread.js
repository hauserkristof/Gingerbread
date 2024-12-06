import { ZigWASM } from "./zigwasm.js";

export class LibGingerbread {
    static wasm_src = "./native/gingerbread.wasm";
    static wasm_module;

    constructor(zig) {
        this.zig = zig;
    }

    static async new() {
        if (this.wasm_module == null) {
            this.wasm_module = await ZigWASM.compile(this.wasm_src);
        }

        return new this(await ZigWASM.new(this.wasm_module));
    }

    conversion_start() {
        this.zig.exports.conversion_start();
    }

    conversion_add_raster_layer(layer, scale, image) {
        if (!this.image_array_ptr) {
            this.image_array_ptr = this.zig.allocate(image.data.byteLength);
        }

        this.image_array_ptr.u8().set(image.data);

        this.zig.exports.conversion_add_raster_layer(layer, scale, this.image_array_ptr.address, image.width, image.height);
    }

    conversion_finish() {
        this.image_array_ptr.free();
        return this.zig.return_str(this.zig.exports.conversion_finish());
    }

    conversion_start_poly() {
        this.zig.exports.conversion_start_poly();
    }

    conversion_add_poly_point(x, y, layer_number, scale_factor) {
        this.zig.exports.conversion_add_poly_point(x, y, layer_number, scale_factor);
    }

    conversion_end_poly(layer, width, fill) {
        this.zig.exports.conversion_end_poly(layer, width, fill);
    }

    conversion_add_drill(x, y, d, scale_factor) {
        this.zig.exports.conversion_add_drill(x, y, d, scale_factor);
    }

    set_mirror_back_layers(val) {
        this.zig.exports.set_mirror_back_layers(val);
    }
}
